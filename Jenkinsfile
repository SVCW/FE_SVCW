pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Build'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Run Tests'
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Cleanup'
            }
        }
    }
}