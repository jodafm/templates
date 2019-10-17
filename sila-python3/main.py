import json

# Sila Dependencies
from silasdk import App

def handler(event, context):
    print(f"Event: {event}")

    silaApp = App("SANDBOX", "app_private_key", "app_handle")

    body = {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "input": event
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

# Testing locally
if __name__ == "__main__":
    response = handler({}, {})
    print(f"Response: {response}")