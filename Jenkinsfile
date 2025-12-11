pipeline {
    agent any
    
    stages {
        stage('Clone Code From GitHub') {
            steps {
                git branch: 'main', url: 'https://github.com/YOURNAME/YOURREPO.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@EC2_PUBLIC_IP "sudo rm -rf /var/www/myapp/*"
                    
                    scp -o StrictHostKeyChecking=no -r * ubuntu@EC2_PUBLIC_IP:/var/www/myapp/

                    ssh -o StrictHostKeyChecking=no ubuntu@EC2_PUBLIC_IP "
                      cd /var/www/myapp &&
                      npm install &&
                      pm2 restart all || pm2 start app.js
                    "
                    '''
                }
            }
        }
    }
}
