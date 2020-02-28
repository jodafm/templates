# Tutorial for Running Param Copy Function

2

​

3

​

4

* [Overview](#overview)

5

​

6

* [Env File Setup](#env-file-setup)

7

​

8

* [Run](#run)

9

​

10

## Overview

11

​

12

This tutorial explains how to duplicate params from one Serverless Pro profile to another. The Serverless Dashboard allows for unlimited params on a profile so on larger projects copying each line item to a new profile can be prohibitive. This template creates a local node.js environment that pulls an original profile, compares it to a new profile, and then pushes up a new list of combined params and safeguards.

13

​

14

More information on parameters can be found in the [Serverless Documenation](https://serverless.com/framework/docs/dashboard/parameters/). 

15

​

16

## Env File Setup

17

​

18

### 1. Add `SLS_ORG` to `.env` File

19

​

20

Your Serverless Dashboard organization can be found both in the top right corner and in the URL after `/tenants`:

21

​

22

This and all remaining variables will be added to the `.env` file like so:

23

​

24

```

25

SLS_ORG=serverlessguru

26

```

27

​

28

### 2. Add `FROM_PROFILE` to `.env` File

29

​

30

This is the ID of the Serverless profile you are looking to copy params *from*.

31

​

32

You can find this value by navigating to "Profiles" in the Serverless Dashboard and selecting the desired profile. Once there get the profile's ID from the URL:

33

​

34

### 3. Add `TO_PROFILE` to `.env` File