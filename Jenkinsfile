pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'
        SUPPLYOPS_EMAIL = credentials('supplyops-email')
        SUPPLYOPS_PASSWORD = credentials('supplyops-password')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'SupplyOps source code checked out successfully.'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'node --version'
                bat 'npm --version'
                bat 'git --version'
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npm test'
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**, test-results/**',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'SupplyOps Playwright CI completed successfully.'
        }

        failure {
            echo 'SupplyOps Playwright CI failed. Review the console output and archived evidence.'
        }
    }
}
