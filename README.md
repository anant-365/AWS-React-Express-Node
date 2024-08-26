
# Deploying a React App to AWS S3 with GitHub Actions and Hosting It / Also deploying the node backend to AWS Lambda functions.

In this project, we will be deploying a locally developed group chat app made with react as front-end, node as back-end and using AWS services like lambda functions for backend and s3 for front-end to make the web app publically accessible.

**App Preview**

![App Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/Screenshot%202024-08-26%20212032.png)

**Architecture**

![App Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/AWS_React_Node%20Project%20Workflow%20Flowchart.png)



## Objectives

1.Simplify the deployment process for React.js applications.

2.Automate deployment pipeline using GitHub Actions.

3.Enable scalable hosting of React.js apps on AWS S3.

4.Deliver exceptional user experiences through reliable deployments.

5.Empower developers with knowledge and tools for efficient deployment and hosting.



## Prerequisites

**React.js/Node:** Basic understanding of React.js and Node/Express.

**Github Account:** GitHub account for repository hosting and GitHub Actions.

**AWS Account:** AWS S3 for hosting the React.js application and lambda functions for deploying the node backend.

**Other Requirements:** Access and permissions for GitHub and AWS S3 and lambda functions, Familiarity with YAML configuration, Command-line interface (CLI) proficiency.



## Steps to follow (FRONT-END PART)

### Step 1: Creating an IAM user. ###
  Create an IAM user and attach the AmazonS3FullAccess policy.<br/>-----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/iam_1.webp)
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/iam_2.webp)
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/iam_3.webp)

### Step 2: Create an Access key from the security credential section of the newly created user. ###
  Make sure you downloaded the .csv file or note the data some where else, Because we can see it only once.<br/>
  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/access_key.webp)

### Step 3: Create an S3 bucket. ###
  Give a name to the bucket and enable ACLs.<br/>
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/s3_1.webp)<br/><br/>Untick Block all public access and tick the warning after reading it.
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/s3_2.webp)

### Step 4: Create a new repo in GitHub with public access. ###
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/repo_1.webp)<br/><br/>You can add a description and readme file if you want to add them.

### Step 5: Go to the settings of your repo and select the secrets from the left section. ###
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/repo_2.webp)

### Step 6: Click on the new repository secret and add all details. ###
  add AWS S3 Bucket name as AWS_S3_BUCKET<br/>
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/repo_3.webp)<br/><br/>add AWS access key as AWS_ACCESS_KEY_ID<br/>
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/repo_4.webp)<br/><br/>add AWS secret key as AWS_SECRET_ACCESS_KEY<br/>
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/access_secret_repo.webp)<br/><br/>After creating this, you can see like this<br/>
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/repo_5.webp)

### Step 7: Create React app and add a GitHub Actions workflow. ###
  ```bash
   npm create vite@latest
```
   <br/> After creating a React app, add one folder “.github\workflows” and add a new file in it and name it “main.yaml”. Copy the below code into the main.yaml file:<br/>
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/workflow.webp)
  ```bash
   name: Upload Website

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install --legacy-peer-deps


      - name: Change ownership of node_modules
        run: sudo chown -R $USER:$USER ./node_modules

      - name: Set permissions for node_modules
        run: chmod -R 755 ./node_modules

      - name: Build app
        run: npm run build

      - name: Upload to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl public-read
        env:
          SOURCE_DIR: dist/
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_KEY }}
```

### Step 8: Add it to GitHub. ###
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/repo_6_add.webp)

### Step 9: Go to the Action section and see the process. ###
  After uploading the code go to the Action section and see how GitHub Actions builds and uploads the code to S3. It will take some time initially but after the first push, time will reduce because there will be 
  fewer changes compared to the first time.<br/>
  After clicking on it, you can see your recent commit. Click on it and then click on build. You can see all processes which are going on. After finishing all processes, you will see this:<br/>
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/gh_actions_1.webp)

### Step 10: Configure S3 for web hosting. ###
  You can see all uploaded files from GitHub here.<br/>
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/s3_3_hosting.webp)<br/>
  Now go to the Properties section and scroll down to the end. You can see the Static website hosting option. Click on edit and enable it and write index.html in the index document section. Then save changes.<br/>
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/s3_4_hosting.webp)<br/>
  Now you can see a link in the static website hosting section. Open it in a new tab.<br/>
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/s3_5_hosting.webp)<br/>
  After visiting the link you can see that your React application is live now. Whenever you change your code and push it to GitHub, you will see new changes here within a few seconds.<br/><br/>
  NOTE - EITHER YOU CAN ADD YOUR CUSTOM CODE FOR MAKING DESIRED FRONT-END OR ADD THE REACT CODE FROM REACT-FRONTEND FOLDER PRESENT IN THIS REPOSITORY. 




## Deployment

To deploy this project run the code in lambda function 

```bash
 import json
 import boto3

def lambda_handler(event, context):
    
    client = boto3.client("rekognition")
    
    response = client.detect_labels(Image={"S3Object": {"Bucket":"imgbucket1234", "Name": "img1.jpg"}}, MaxLabels=3 ,MinConfidence= 80
    )
    print (response)
```


## Result
Function Logs
START RequestId: 41176eda-ca87-4aa3-b20e-a9dae275d24d Version: $LATEST

**{'Labels': [{'Name': 'License Plate', 'Confidence': 99.9888916015625, 'Instances': [], 'Parents': [{'Name': 'Transportation'}, {'Name': 'Vehicle'}], 'Aliases': [], 'Categories':
 [{'Name': 'Vehicles and Automotive'}]}, {'Name': 'Road', 'Confidence': 99.96435546875, 'Instances': [], 'Parents': [], 'Aliases': [], 'Categories': [{'Name': 'Transport and Logistics'}]}, {'Name': 'City', 'Confidence': 99.92589569091797, 'Instances': [], 'Parents': [], 'Aliases': [{'Name': 'Town'}],**
 

END RequestId: 41176eda-ca87-4aa3-b20e-a9dae275d24d
REPORT RequestId: 41176eda-ca87-4aa3-b20e-a9dae275d24d	Duration: 2968.59 ms	Billed Duration: 2969 ms	Memory Size: 128 MB	Max Memory Used: 76 MB	Init Duration: 310.23 ms
## Detailed Steps

1. First login to your aws account

2. Download python and pip in your device alongwith aws cli 

3. Make iam user to gain the necessary credentials to configure cli 

4. Install boto3 

5. Make a bucket in S3 to store the images

6. Make a role with iam to gain access to all corresponding services like rekognition

7. We can always trigger the event to lambda where as you add the image to bucket it automatically analyses it.         
## Code Explanation

Explanation of Code:

1.Initialize Rekognition Client: rekognition = boto3.client('rekognition') initializes the client to interact with the Rekognition service.

2.Loading Image: The image is read as bytes since Rekognition accepts image data in byte format.

3.Rekognition API Call: detect_labels() sends the image to Rekognition using detect_labels() API call, which returns labels (objects, scenes, and concepts) detected in the image.

4.Result: The detected labels are printed, including the name and confidence level.
## Screenshots


![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0022.jpg?raw=true)

![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0011.jpg?raw=true)

![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0025.jpg?raw=true)

![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0034.jpg?raw=true)

![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0010.jpg?raw=true)

![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0013.jpg?raw=true)

![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0029.jpg?raw=true)

![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0014.jpg?raw=true)

![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0015.jpg?raw=true)



![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0018.jpg?raw=true)
![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0019.jpg?raw=true)

![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0024.jpg?raw=true)

![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0017.jpg?raw=true)

![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0016.jpg?raw=true)
![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0021.jpg?raw=true)

![App Screenshot](https://github.com/2ananya/AWS-Project-Rekognition-/blob/main/IMG-20240826-WA0026.jpg?raw=true)
This is how rekognition works by itself on the same image used.












## Possible Use Cases

1. **Content Moderation**
2. **E-commerce Automation**
3. **Image Search & Discovery**
4. **Social Media Tagging**
5. **Digital Asset Management**
6. **Photo Organization**
7. **Marketing & Ad Targeting**
8. **Surveillance & Security**
9. **Wildlife & Environmental Monitoring**
10. **Medical Imaging Analysis**
