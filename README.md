### Travel Planning - Website

## Description

When planning a trip to a new (or old) place, we're often using multiple pages, apps, and websites to find the most popular places to visit, the order to visit each one, and what to do at each location. This website woll provide a central location for all trip planning. It will include a map where you can pin any places you want, recommend the best method of transportation for those, let you link locations, create to-do lists, find information on the city, and more.

## User Stories

**User role:** Planner
-  A user who wants to plan a trip

**User personas:**
- Name: Samantha
    - Location: Canby, OR (rural area)
    - Age: 35
    - Technology usage and familliarity:
        - Limited usage. Samantha knows how to use basic website functionalities for remote work such as search, accessing video calls, naviagating through simple sites, etc. Samantha mainly uses their computer for work and rarely interacts with technology outside of that. Samantha enjoys her time in nature.
    - Motivation:
        - Although Samantha doesn't like to interact with technology much, Samantha does like to travel and explore once in a while. Samantha has limited experience traveling (being in a rural area), so they like every trip to be perfect and only include exactly what they like. Samantha wants to plan an organized, efficient, and successful trip while limiting their interactions with technology.
    - Potential pain points:
        - Won't be as open to new features. Samantha prefers simplicity.
        - Wants transparency when it comes to the locations on their trip
        - Hesitant to travel outside of their area so Samantha requires simple, easy-to-understand information

- Name: Andy
    - Location: Boston, MA
    - Age: 24
    - Technology usage and familiarity:
        - Very familiar, but no technical expertise. Andy is a trip planner and has worked on many different platforms to plan trips for their clients. Andy primarily uses their phone very often to keep up to date with the latest trends on Instagram and travel blogs. Andy also uses a laptop to do his work.
        - Andy would access my site almost daily to ensure all his client's trips are going smoothly.
    - Motivations:
        - Andy would use this website to assist with their work. Andy is tired of having over twenty tabs open every time he plans a single trip. They want a more central location to note good locations to visit, distances between each one, and the order to visit each location.
    - Potential pain points:
        - Needs access to many trip plans simultaneously. Andy's schedule is very hectic so they need a very organized app that can be personalized.
        - Needs to fully understand all website functionality since they will be sending the trip plans to their clients and will need to help their clients understand as well.
        - Andy wants to be very detailed when planning.


**User stories:**
- As a traveller, I want to find the best locations to visit in this new city.
- As a traveller, I need to know the best way to get to each location.
- As a traveller, I want to be able to access this planning website even while on the road (through my phone).
- As a traveller, I want to print out my itinerary after planning it online.
- As a planner, I want to find the best order of places to visit to maximize the amount of time I have at each location.
- As a planner, I want to personalize my website/planner.
- As a planner, I want to create different lists so my ideas don't become convoluted.
- As a planner, I want to personalize my places to visit so I can have my own lists and categories.
- As a planner, I want to save information about each place I might visit without exiting the planner website.
- As a planner, I want to filter for locations by category.
- As a planner, I want to find what other travelers in the same area choose to do so I can use their plan as a template for my own.
- As a planner, I want to connect and group locations based on their type or distance so I can efficiently visit each one.
- As a planner, I want to save past trips so I can reflect and know what I should do in the future.
- As a planner, I want to filter the events by days.

## Limitations
- The Google Maps API gives you $200 per month to use, but once you surpass that (too many API calls), you will be charged. This means there is a limit to how often this site can be tested/used (and by how many users)
    - I will need to add something in the code to send an error and not call the api when near the max quota.
    - This will be difficult to test. (only 40 requests for directions can be made per month)
    - Embedding the map is free. This will only affect getting directions.
    - It may not be feasible to calculate directions on this website. This may need to be left up to the user.
    - Check out personal alternatives here: https://www.igismap.com/top-10-map-direction-api-routing-libraries-navigation-free-or-paid/
- Can I webscrape Google Search Results? (need to learn)
    - This will get the recommendations of things to do
    
## Notes
  - Walkability score api: https://www.walkscore.com/professional/api.php
  - Elevation data api: https://www.opentopodata.org/
    - 1000 calls per day max
  - Geocoding api: https://developers.google.com/maps/documentation/geocoding/overview
    - in case I need to convert addresses to coordinates for other api calls (or vice versa)
  - Weather api: https://openweathermap.org/api
    - 1000 calls per day
