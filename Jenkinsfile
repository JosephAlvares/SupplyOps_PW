
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
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
                withCredentials([
                    string(
                        credentialsId: 'supplyops-email',
                        variable: 'SUPPLYOPS_EMAIL'
                    ),
                    string(
                        credentialsId: 'supplyops-password',
                        variable: 'SUPPLYOPS_PASSWORD'
                    )
                ]) {
                    bat 'npm test'
                }
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
