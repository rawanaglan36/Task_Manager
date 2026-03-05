# ☁️ AWS Free Tier Deployment Guide - Task Manager

Complete guide to deploy the Task Manager application on AWS using free tier services.

---

## 🎯 Recommended AWS Free Tier Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Internet                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   Route 53 (Optional) │
              │   DNS Management      │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   EC2 Instance        │
              │   t2.micro (Free)     │
              │   - Docker            │
              │   - Task Manager      │
              │   - MongoDB           │
              │   - Redis (Optional)  │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   EBS Volume          │
              │   30GB (Free)         │
              │   Data Persistence    │
              └───────────────────────┘
```

---

## 💰 AWS Free Tier Limits (12 Months)

### EC2 (Elastic Compute Cloud)
- **Instance Type**: t2.micro
- **vCPUs**: 1
- **Memory**: 1 GB
- **Free Hours**: 750 hours/month (enough for 1 instance 24/7)
- **Operating System**: Linux/Ubuntu

### EBS (Elastic Block Storage)
- **Storage**: 30 GB General Purpose (SSD)
- **Snapshots**: 2 GB
- **Free**: First 12 months

### Data Transfer
- **Outbound**: 100 GB/month free
- **Inbound**: Always free

### Elastic IP
- **Free**: 1 Elastic IP (when attached to running instance)
- **Cost**: $0.005/hour if not attached

---

## 🚀 Deployment Options

### **Option 1: Single EC2 Instance (Recommended for Free Tier)**

**Pros:**
- ✅ Completely free for 12 months
- ✅ Simple setup and management
- ✅ All services on one instance
- ✅ Good for development/testing

**Cons:**
- ❌ Limited resources (1GB RAM)
- ❌ Single point of failure
- ❌ Not highly scalable

**Best For:** Development, testing, personal projects, portfolio

---

### **Option 2: EC2 + RDS Free Tier (Not Recommended)**

**Why Not:**
- RDS free tier is very limited (20GB storage, 750 hours)
- MongoDB is not available in RDS free tier
- Better to use MongoDB on EC2 or MongoDB Atlas free tier

---

### **Option 3: Serverless (AWS Amplify + MongoDB Atlas)**

**Pros:**
- ✅ No server management
- ✅ Auto-scaling
- ✅ Free tier available

**Cons:**
- ❌ More complex setup
- ❌ Limited free tier hours
- ❌ Requires code modifications

---

## 📋 Recommended Architecture: Single EC2 Instance

### Architecture Components:

```
EC2 Instance (t2.micro - 1GB RAM, 1 vCPU)
├── Docker Engine
├── Docker Compose
├── Task Manager Container (Port 3000)
├── MongoDB Container (Port 27017)
├── Redis Container (Port 6379) - Optional
└── Nginx (Port 80/443) - Optional
```

### Resource Allocation:
- **Task Manager**: ~300-400 MB RAM
- **MongoDB**: ~200-300 MB RAM
- **Redis**: ~50-100 MB RAM (if used)
- **System**: ~200 MB RAM
- **Total**: ~750-1000 MB (fits in 1GB)

---

## 🛠️ Step-by-Step Deployment

### Step 1: Create AWS Account
1. Go to https://aws.amazon.com/free/
2. Sign up for AWS Free Tier
3. Verify email and payment method
4. Complete account setup

### Step 2: Launch EC2 Instance

1. **Login to AWS Console**
   - Navigate to EC2 Dashboard
   - Select your preferred region (e.g., us-east-1)

2. **Launch Instance**
   ```
   Click "Launch Instance"
   ```

3. **Configure Instance**
   - **Name**: task-manager-server
   - **AMI**: Ubuntu Server 22.04 LTS (Free tier eligible)
   - **Instance Type**: t2.micro (Free tier eligible)
   - **Key Pair**: Create new or use existing
   - **Network Settings**:
     * Create security group
     * Allow SSH (22) from your IP
     * Allow HTTP (80) from anywhere
     * Allow HTTPS (443) from anywhere
     * Allow Custom TCP (3000) from anywhere
   - **Storage**: 30 GB gp3 (Free tier eligible)

4. **Launch Instance**

### Step 3: Connect to EC2 Instance

```bash
# Download your key pair (.pem file)
chmod 400 your-key.pem

# Connect via SSH
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

### Step 4: Install Docker & Docker Compose

```bash
# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install Docker
sudo apt-get install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker ubuntu
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### Step 5: Clone and Deploy Application

```bash
# Install Git
sudo apt-get install git -y

# Clone repository
git clone https://github.com/rawanaglan36/Task_Manager.git
cd Task_Manager

# Create environment file (if needed)
nano .env.local
# Add: NEXT_PUBLIC_BASE_URL=http://your-ec2-public-ip:5000

# Deploy with Docker Compose
docker-compose up -d --build

# Check status
docker-compose ps
docker-compose logs -f
```

### Step 6: Configure Security Group

Add inbound rules in AWS Console:
```
Type            Protocol    Port    Source
SSH             TCP         22      Your IP
HTTP            TCP         80      0.0.0.0/0
HTTPS           TCP         443     0.0.0.0/0
Custom TCP      TCP         3000    0.0.0.0/0
```

### Step 7: Access Application

Open browser: `http://your-ec2-public-ip:3000`

---

## 🔒 Security Best Practices

### 1. Update Security Group Rules
```bash
# Restrict SSH to your IP only
# Remove port 3000 if using Nginx reverse proxy
```

### 2. Setup Firewall (UFW)
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp
sudo ufw enable
```

### 3. Change MongoDB Credentials
Edit `docker-compose.yml`:
```yaml
environment:
  MONGO_INITDB_ROOT_USERNAME: your_username
  MONGO_INITDB_ROOT_PASSWORD: strong_password
```

### 4. Setup Nginx Reverse Proxy (Optional)
```bash
# Install Nginx
sudo apt-get install nginx -y

# Create configuration
sudo nano /etc/nginx/sites-available/taskmanager

# Add configuration:
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/taskmanager /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. Setup SSL with Let's Encrypt (Optional)
```bash
sudo apt-get install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

---

## 💾 Data Persistence & Backup

### MongoDB Data Backup
```bash
# Backup MongoDB data
docker exec mongo mongodump --out /backup --username root --password example

# Copy backup from container
docker cp mongo:/backup ./mongodb-backup-$(date +%Y%m%d)

# Download to local machine
scp -i your-key.pem -r ubuntu@your-ec2-ip:~/mongodb-backup-* ./
```

### Automated Backup Script
```bash
# Create backup script
nano backup.sh

#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/ubuntu/backups"
mkdir -p $BACKUP_DIR

# Backup MongoDB
docker exec mongo mongodump --out /backup --username root --password example
docker cp mongo:/backup $BACKUP_DIR/mongodb-$DATE

# Keep only last 7 days
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} \;

# Make executable
chmod +x backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
0 2 * * * /home/ubuntu/backup.sh
```

---

## 📊 Monitoring & Maintenance

### Check Resource Usage
```bash
# CPU and Memory
htop
# or
top

# Disk usage
df -h

# Docker stats
docker stats

# Application logs
docker-compose logs -f taskmanager
```

### Setup CloudWatch (Optional)
```bash
# Install CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i amazon-cloudwatch-agent.deb

# Configure monitoring
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
```

---

## 💡 Cost Optimization Tips

### 1. Use Elastic IP
```bash
# Allocate Elastic IP (free when attached)
# Prevents IP change on instance restart
```

### 2. Stop Instance When Not Needed
```bash
# Stop instance (no charges for stopped instances)
# Only pay for EBS storage
```

### 3. Monitor Free Tier Usage
- Check AWS Billing Dashboard regularly
- Set up billing alerts
- Monitor free tier usage limits

### 4. Optimize Docker Images
```bash
# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune
```

---

## 🔄 Alternative: MongoDB Atlas (Free Tier)

Instead of running MongoDB on EC2, use MongoDB Atlas free tier:

### MongoDB Atlas Free Tier:
- **Storage**: 512 MB
- **RAM**: Shared
- **Backup**: Daily snapshots
- **Free Forever**: No credit card required

### Setup:
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free cluster
3. Get connection string
4. Update docker-compose.yml:
```yaml
environment:
  MONGODB_URI: mongodb+srv://username:password@cluster.mongodb.net/taskmanager
```

### Benefits:
- ✅ Saves EC2 resources
- ✅ Managed backups
- ✅ Better performance
- ✅ Free forever

---

## 📈 Scaling Beyond Free Tier

When you outgrow free tier:

### Option 1: Upgrade EC2 Instance
- t3.small (2GB RAM) - ~$15/month
- t3.medium (4GB RAM) - ~$30/month

### Option 2: Use AWS Lightsail
- $3.50/month for 512MB RAM
- $5/month for 1GB RAM
- Simpler pricing

### Option 3: Use Managed Services
- AWS Amplify for frontend
- AWS Lambda for backend
- MongoDB Atlas for database

---

## 🆘 Troubleshooting

### Issue: Out of Memory
```bash
# Check memory
free -h

# Add swap space
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Issue: Docker Container Crashes
```bash
# Check logs
docker-compose logs

# Restart services
docker-compose restart

# Rebuild
docker-compose up -d --build
```

### Issue: Cannot Connect to Instance
```bash
# Check security group rules
# Verify SSH key permissions: chmod 400 key.pem
# Check instance status in AWS Console
```

---

## 📚 Additional Resources

- AWS Free Tier: https://aws.amazon.com/free/
- EC2 Documentation: https://docs.aws.amazon.com/ec2/
- Docker Documentation: https://docs.docker.com/
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Let's Encrypt: https://letsencrypt.org/

---

## ✅ Deployment Checklist

- [ ] AWS account created and verified
- [ ] EC2 instance launched (t2.micro)
- [ ] Security group configured
- [ ] SSH access working
- [ ] Docker and Docker Compose installed
- [ ] Application cloned and deployed
- [ ] Application accessible via browser
- [ ] MongoDB credentials changed
- [ ] Firewall configured
- [ ] Backup script created
- [ ] Monitoring setup
- [ ] Domain configured (optional)
- [ ] SSL certificate installed (optional)

---

## 👨‍💻 Author

**Rawan Aglan**  
DevOps Engineer  
📧 [GitHub](https://github.com/rawanaglan36)  
🗓️ *2026*

---

**⭐ Remember: AWS Free Tier is valid for 12 months from account creation! ⭐**
