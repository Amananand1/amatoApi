-------------All API list------------

PAGE --> 1 (Home page)

>List of city (this wil return all the city) ----->
>>>>>>>>>>>>>>>>>http://localhost:8511/location           >>>>>>>>>>>>>>Done


>Resturant wrt city (On the basic of city, return all resturants) ----->
>>>>>>>>>>>>>>>>>>>>>>>> http://localhost:8511/resturantData?city=1   >>>>>>>>>>>Done


> List of all meal type (return all the meal types)  ---------->
>>>>>>>>>>>>>>>>>>>>>>>>>>>>http://localhost:8511/mealType     >>>>>>>>>>>>>>done

--------------------------------------------------------------------------------------------------->

PAGE --> 2(Listing page)
>Find resturant on the basic of meal type (this will returan all the resturant for particular meal) ----------->
>>>>>>>>>>>>>>>>>>>>>>http://localhost:8511/resturantData/1 >>>>>>>>>>>>>>>>>>>Done

>Filter---->>>>>>>>>>>
>>cusinie filter (search on the basics of meal type and cusinie)------->
>>>>>>>>>>>>>>>http://localhost:8511/resturantData/1?cuisine=5  >>>>>>>>>>>done

>>cost filter (search on the basics of meal type and cost) ------------>
>>>>>>>>>>>>>http://localhost:8511/resturantData/1?lcost=400&hcost=1000 >>>>>>>done

>>short filter (high to low and low to high)------------->
>>>>>>>>>>>>>>>>>>>>>>http://localhost:8511/resturantData/1?sortkey=-1 >>>>>>>>>>done

>> cusinie + cost (search on the basics of meal type and cusinie + cost) ------->
>>>>>>>>>>>>>>>>>>>>http://localhost:8511/resturantData/1?lcost=400&hcost=700&cuisine=1 >>>>>>done


-------------------------------------------------------------------------------------------->

PAGE --> 3 (Details page)

>Get details of restaurant on the basics of id --->
>>>>>>>>>>>>>>>>>>>>>>>>>>>>http://localhost:8511/resturant/1 >>>>>>>>>>>>>>>>> done


> Menu wrt resturant (return all the items of particular resturants)----------->
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>http://localhost:8511/resturantMenu/1 >>>>>done


----------------------------------------------------------------------------------------------->

PAGE ---> 4 (Summary page)
>Menu wrt to id (it return all the items on the basic of id) ------->
>>>>>>>>>>>>>>>>>>>>>>>>>http://localhost:8511/menuItem>>>>>>>>>>>>>>>>>>done (postman -- post)

> Post the order (insert the details in db) ----->(postman) (post)
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>http://localhost:8511/placeorder

----------------------------------------------------------------------------------------------->

PAGE ----> 5 (order page)
>List all the order placed
>>>>>>>>>>>>>>>>>>>>>>>>>http://localhost:8511/orderPage >>>>>>>>>>>>>>>>>>>>>>>>>>>>>Done

//update orders with paymensts details

>>>>>>>>>>>>http://localhost:8511/updateStatus/1 done (postman -- put)

{
	"status":"Delivered",
	"date":"2021-08-19%2021:32:37.0",
	"bank_status":"TXN_SUCCESS",
	"bank":"Bharat%20Bank"
}

//delete orders(postman --  delete)
>>>>>>>>http://localhost:8511/deleteorder>>>>>>>>> done

