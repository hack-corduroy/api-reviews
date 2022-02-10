# Ratings & Reviews

## Requirements Overview
1. Create an API that conforms to the existing API spec
2. Create a database that will house the data served by the API
3. Implement unit tests and integration tests to cover your working service.
4. No loss of uptime when cutting over from legacy API to new service
5. All DB queries should execute in <50ms
6. Implement logging for service

## Database Selection
I explored both PostgreSQL and MongoDB as potential database management systems. After weighing the pros and cons, I ultimately decided to use PostgreSQL. 

### PostgreSQL
Pros: 
 - Scalability
 - Speed
 - Query Ability

Cons: 
 - Slower to implement

### MongoDB
Pros:
 - Faster to implement

Cons:
 - Speed
 - Scalability

## Schema Design
![Schema]()


