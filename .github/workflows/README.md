# GitHub Actions Deployment Setup

This workflow automatically deploys your Node.js backend to EC2 when you push to the main branch.

## Required GitHub Secrets

Go to your repository → Settings → Secrets and variables → Actions, and add these secrets:

### Docker Hub Credentials
- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Your Docker Hub password or access token

### EC2 Connection Details
- `EC2_HOST` - Your EC2 instance public IP or domain (e.g., `54.123.45.67`)
- `EC2_USER` - SSH username (usually `ubuntu` for Ubuntu or `ec2-user` for Amazon Linux)
- `EC2_SSH_KEY` - Your EC2 private key (the entire content of your .pem file)

### MongoDB Connection
- `MONGODB_URI` - Your MongoDB connection string (e.g., `mongodb://localhost:27017/todoapp` or MongoDB Atlas URI)

## EC2 Prerequisites

Make sure your EC2 instance has:

1. Docker installed:
```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

2. Security group allows:
   - Port 22 (SSH)
   - Port 3000 (API)
   - Port 27017 (MongoDB, if using local MongoDB)

3. MongoDB running (if using local MongoDB):
```bash
sudo docker run -d -p 27017:27017 --name mongodb --restart unless-stopped mongo:7
```

## How It Works

1. Push code to `main` branch
2. GitHub Actions builds Docker image
3. Pushes image to Docker Hub
4. SSHs into EC2
5. Pulls latest image
6. Stops old container
7. Starts new container with environment variables

## Manual Deployment

If you need to deploy manually:

```bash
# On your local machine
docker build -t your-username/nodejs-backend:latest .
docker push your-username/nodejs-backend:latest

# On EC2
sudo docker pull your-username/nodejs-backend:latest
sudo docker stop nodejs-backend || true
sudo docker rm nodejs-backend || true
sudo docker run -d -p 3000:3000 \
  -e PORT=3000 \
  -e MONGODB_URI="your-mongodb-uri" \
  --name nodejs-backend \
  --restart unless-stopped \
  your-username/nodejs-backend:latest
```
