select reservations.id, properties.title, reservations.start_date, properties.cost_per_night, avg(property_reviews.rating) as average_rating
FROM users
JOIN reservations on reservations.guest_id = users.id
JOIN properties on reservations.property_id = properties.id
JOIN property_reviews on properties.id = property_reviews.property_id
WHERE users.id = 1
group by reservations.id, properties.title, properties.cost_per_night
order by start_date asc
limit 10;