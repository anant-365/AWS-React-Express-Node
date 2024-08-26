
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

**Step 1: Creating an IAM user.**
  Create an IAM user and attach the AmazonS3FullAccess policy.




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
