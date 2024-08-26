
# Deploying a React App to AWS S3 with GitHub Actions and Hosting It / Also deploying the node backend to AWS Lambda functions.

In this project, we will be deploying a locally developed group chat app made with react as front-end, node as back-end and using AWS services like lambda functions for backend and s3 for front-end to make the web app publically accessible.<br/>
<br/> ___NOTE - TO MAKE THIS PROJECT, YOU DON’T HAVE TO USE THE CODE BASE PROVIDED IN THIS REPO. YOU ARE FREE TO CHOOSE YOUR OWN CUSTOM FRONT-END AND BACK-END CODE BASE. HOWEVER, MAKE SURE TO FOLLOW THE STEPS CAREFULLY, BE AWARE OF THE CUSTOMIZATIONS YOU ARE MAKING TO THESE STEPS, AND KNOW HOW TO FIX ANY ERRORS THAT MAY ARISE FROM THOSE CUSTOMIZATIONS.___

## App Preview

![App Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/Screenshot%202024-08-26%20212032.png)

## Architecture

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

**AWS Account:** AWS S3 for hosting the React.js application and lambda functions for deploying the node backend (MAKE SURE TO LOGIN IN YOUR AWS ACCOUNT TO PERFORM AWS RELATED STEPS).

**Other Requirements:** Access and permissions for GitHub and AWS S3 and lambda functions, Familiarity with YAML configuration, Command-line interface (CLI) proficiency.



## Steps to follow (FRONT-END PART)

### Step 1: Creating an IAM user. ###
  Create an IAM user and attach the AmazonS3FullAccess policy.<br/>
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/iam_1.webp)
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/iam_2.webp)
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/iam_3.webp)

### Step 2: Create an Access key from the security credential section of the newly created user. ###
  Make sure you downloaded the .csv file or note the data some where else, Because we can see it only once.<br/>
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/access_key.webp)

### Step 3: Create an S3 bucket. ###
  Give a name to the bucket and enable ACLs.<br/>
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/s3_1.webp)<br/><br/>

  -----
  Untick Block all public access and tick the warning after reading it.

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/s3_2.webp)

### Step 4: Create a new repo in GitHub with public access. ###
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/repo_1.webp)<br/><br/>You can add a description and readme file if you want to add them.

### Step 5: Go to the settings of your repo and select the secrets from the left section. ###
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/repo_2.webp)

### Step 6: Click on the new repository secret and add all details. ###
  add AWS S3 Bucket name as AWS_S3_BUCKET<br/>
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/repo_3.webp)<br/><br/>
  
  -----
  add AWS access key as AWS_ACCESS_KEY_ID<br/>

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/repo_4.webp)<br/><br/>
  
  -----
  add AWS secret key as AWS_SECRET_ACCESS_KEY<br/>

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/access_secret_repo.webp)<br/><br/>
  
  -----
  After creating this, you can see like this<br/>

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/repo_5.webp)

### Step 7: Create React app and add a GitHub Actions workflow. ###
  ```bash
   npm create vite@latest
```
   <br/> After creating a React app, add one folder “.github\workflows” and add a new file in it and name it “main.yaml”. Copy the below code into the main.yaml file:<br/>
   
   -----
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

  -----
  Now go to the Properties section and scroll down to the end. You can see the Static website hosting option. Click on edit and enable it and write index.html in the index document section. Then save changes.<br/>

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/s3_4_hosting.webp)<br/>
  
  -----
  Now you can see a link in the static website hosting section. Open it in a new tab.<br/>

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/s3_5_hosting.webp)<br/>
  After visiting the link you can see that your React application is live now. Whenever you change your code and push it to GitHub, you will see new changes here within a few seconds.<br/><br/>
  NOTE - EITHER YOU CAN ADD YOUR CUSTOM CODE FOR MAKING DESIRED FRONT-END OR ADD THE REACT CODE FROM REACT-FRONTEND FOLDER PRESENT IN THIS REPOSITORY. 

  ### Step 11: Deploy React App to CloudFront. ###
  We need to create a CDN that will speed up the distribution of our website content by routing user requests through the AWS network.<br/>
  - Search for Cloudfront in the AWS console.

-----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/cloudFront_1.webp)

-----
  - Select “Create distribution” button.

-----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/cloudFront_2.webp)

-----
  - Input the URL link to our S3 bucket under the origin domain.
  - You can leave the other options as the default.
-----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/cloudFront_3.webp)
-----
  - Scroll to the bottom of the page under setting and input the CNAME
  - Since we want to use HTTPS for this project, we will need to add a certificate
  - So, proceed to the “Request certificate” link just below that.
-----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/cloudFront_4.webp)
-----
  - If the custom domain is not available we can skip the request certificate step ( YOU CAN REQUEST CERTIFICATE IF YOU WANT, I DIDN'T REQUEST THE CERTIFICATE FOR MY PROJECT ).
  - Leave rest as default and create the distribution.
  - Copy the distribution domain name and paste it in your browser search bar and search it.
-----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/Screenshot%202024-08-26%20212032.png)

-----
  - Awesome! As seen in the above image, we can now load the website with https enabled.



## Steps to follow (BACK-END PART)

- To deploy the back-end first zip the node code ___( MAKE SURE THE ZIPPED FOLDER DONOT CONTAIN ANOTHER FOLDER INSIDE, ALL THE CODE WITH NODE MODULES FOLDER SHOULD BE IN THE ROOT ZIPPED FOLDER ITSELF )___.
- Make a Separate S3 bucket for backend.
- Upload the node zip file to backend s3 bucket.
- Now go to lambda function and upload the code via s3 backend bucket. ___( MAKE SURE TO UPLOAD THE NODE MODULES FOLDER IN THE ZIP NODE FILE, OTHERWISE WE MAY ENCOUNTER AN ERROR )___



## Steps to follow (AWS API GATEWAY - WEBSOCKET API)
- Follow along with the steps shown in images below :-<br/>
___NOTE - WHILE CHOOSING THE LAMBDA FUNCTION ARN, MAKE SURE TO SELECT THE ONE WE CREATED IN THE PREVIOUS BACK-END SECTION.___

-----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/Screenshot%202024-08-22%20172327.png)
  
  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/Screenshot%202024-08-22%20172508.png)

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/Screenshot%202024-08-22%20172530.png)

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/Screenshot%202024-08-22%20172657.png)

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/Screenshot%202024-08-22%20172931.png)

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/Screenshot%202024-08-22%20173010.png)

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/Screenshot%202024-08-22%20173113.png)

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/Screenshot%202024-08-22%20173347.png)

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/Screenshot%202024-08-22%20173729.png)

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/Screenshot%202024-08-22%20173750.png)

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/Screenshot%202024-08-22%20180723.png)

  -----
  ![Project Screenshot](https://github.com/anant-365/AWS-React-Express-Node/blob/main/Readme_images/Screenshot%202024-08-22%20180907.png)

-----


## Conclusion

-----
### By following this guide, you will have successfully deployed a React application to AWS S3 and a Node backend to AWS Lambda using GitHub Actions. This setup not only simplifies the deployment process but also ensures a scalable and reliable hosting environment. Feel free to customize the code base as per your requirements, but always be mindful of the steps and potential errors that may arise. Happy coding! ###


