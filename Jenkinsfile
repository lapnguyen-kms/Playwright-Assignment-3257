pipeline {
    agent any
     tools {
        nodejs "node"
        }
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/lapnguyen-kms/Playwright-Assignment-3257']])
            }
        }
        stage('Install') {
            steps {
                sh '''
                    npm i -D @playwright/test && npx playwright install
            '''
            }
        }
        stage('Testing') {
            steps {
                sh '''
                    npx playwright test session5-assignment-1.spec.ts  --project=chromium
                    npx playwright test session5-assignment-2.spec.ts  --project=chromium
                '''
            }
        }
    }
}