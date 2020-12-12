# Personal trainer

This is a final task for Frontend -course at Haaga-Helia University of applied sciences. 

## Contents

- [Introduction](#Introduction)
- [Task 1](#Task-1)
- [Task 2](#Task-2)
- [Task 3](#Task-3)
- [Bonus task](#Bonus-task)
- [Final thoughts](#Final-thoughts)

## Introduction

The task was to create a frontend for personal trainer website. We were given documentation of the backend so we could get, post, put and delete customers and trainings from the database. Job was split into three tasks and some additional extra tasks for those aiming for grade 5. To put it simple: task was to create frontend using React (or Vue). 

## Task 1

### Assignment

First task was to create pages that list customers and trainings from the database. It had to include ability to sort and search. 

### Screenshots

| Image | Description |
|------|-------------|
| [Customerlist 1](screenshots/task1_customerlist1.png) | List of customers and all of their information |
| [Customerlist 2](screenshots/task1_customerlist2.png) | List of customers without address information |
| [Customerlist 3](screenshots/task1_customerlist3.png) | List of customers where search and sort is used |
| [Traininglist 1](screenshots/task1_traininglist1.png) | List of all trainings of all customers |
| [Traininglist 2](screenshots/task1_traininglist2.png) | List of trainings of a single customer |

## Task 2

### Assignment

In addition to listing all customers and trainings, we needed CRUD functions. Now we needed to include ability to add, edit and delete customers and to add and delete trainings. Deleting had to ask for confirmation! 

### Screenshots

| Image | Description |
|------ | -------     |
| [Add customer](screenshots/task2_addcustomer.png) | Form where a customer can be added |
| [Edit customer 1](screenshots/task2_customeredit.png) | Changing the lastname of a customer |
| [Edit customer 2](screenshots/task2_customeredit2.png) | New lastname saved |
| [Add training](screenshots/task2_addtraining.png) | Form where a training can be added |
| [Delete training](screenshots/task2_deletetraining.png) | Confirmation question for deleting a training |

## Task 3

### Assignment

In addition to tasks 1&2 the site needed a calendar that would show all trainings in monthly, weekly and daily views. Plus the app needed to be deployed to some cloud server. 

### Screenshots

| Image | Description |
|------ | -------     |
| [Calendar](screenshots/task3_calendar.png) | Calendar in week view with trainings |

## Bonus task

### Assignment

In addition to all previous tasks we needed to add statistics page that creates graph of time spend on different training activities by customers. 

### Screenshots

| Image | Description |
|------| ----------- |
| [All customers](screenshots/bonus_allcustomers.png) | Statistics of all trainings of all customers drawn to graph |
| [Single customer](screenshots/bonus_singlecustomer.png) | Statistics of a single customers training drawn to graph |

## Final thoughts

This was a really fun assignment. I was so concentrated when writing this React app of mine and if I wouldn't have a ton of other exercises to do, I would be sad that this was done in so little time. 

I must admit that since I am new to tech and programming, it's still hard for me to get a grasp of the app as a whole. This was a good teaching of how important good planning is. I started to write before having a good plan and because of that I have more or less technical debt in my sourcecode. For example as simple thing as config folder: it includes configs and settings (and even styles!). What is that! Also my DatabaseAccessApi.js is a bit of a mess since I started writing it before I had a clear understanding of what I needed from it. Still I am satisfied and overall I consider this a good app considering that this is my first React app. 

Oh, and the app is deployed at: [https://www.roskakori.net/trainer](https://www.roskakori.net/trainer)

