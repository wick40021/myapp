pipeline {
    agent any
    
    stages {
        stage('Clone Code From GitHub') {
            steps {
                git branch: 'main', url: 'https://github.com/wick40021/myapp.git'
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
                    ssh -o StrictHostKeyChecking=no ubuntu@100.27.233.41 "sudo rm -rf /var/www/myapp/*"
                    
                    scp -o StrictHostKeyChecking=no -r * ubuntu@100.27.233.41:/var/www/myapp/

                    ssh -o StrictHostKeyChecking=no ubuntu@100.27.233.41 "
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
