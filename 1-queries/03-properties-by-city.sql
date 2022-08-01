select properties.id, title, cost_per_night, avg(rating) as average_rating
from properties
join property_reviews on properties.id = property_id
where city like '%Vancouver'
group by properties.id
having avg(rating) >= 4
order by cost_per_night
limit 10;
