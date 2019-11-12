# gulappX Backend

This is the backend API of gulappX, feel free to use it or improve it.

## Usage examples


### Get distances between 2 addresses (using gmaps api)

POST
```
/apiGulappX/getDistances

Body:
{
	"originAddr": "Avenida Corrientes 750, Buenos Aires, Argentina",
	"destAddr": "Avenida Corrientes 2500, Buenos Aires, Argentina"
}
```

### Insert a new dish

POST
```
/apiGulappX/insertDish

Body:
{
	"dishName": "Milanesas con Pure",
	"restaurantName": "La Armada",
	"restaurantAddress": "Moreno 650, Buenos Aires, Argentina",
	"dishDescription": "Exquisita Milanesa con Pure",
	"dishDetailedDesc": "La milanesa es un filete fino, normalmente de carne vacuna, pasado por huevo batido y luego por pan rallado, que se cocina frito o (menos comúnmente) al horno. Por extensión, se llama milanesa a cualquier rebanada de un ingrediente rebozado y frito: hay así milanesas de pollo, de pescado, de soja, de berenjena o de mozzarella, entre otros ingredientes. No se conoce el origen de esta receta, aunque hay muchos mitos al respecto. Su nombre español proviene de la ciudad italiana de Milán. Desde fines del siglo xix es una comida típica de la cocina argentina, boliviana, chilena, paraguaya, mexicana y uruguaya.",
	"imageUrl": "https://i.pinimg.com/originals/18/eb/6d/18eb6d8fe68f9f24dabb6f800b3c891e.jpg",
	"starAverage": "4.5",
	"comments": []
}

```

### Update restaurant name

POST
```
/apiGulappX/updateRestaurant

Body:
{
	"id": "5db4a7dd62d70c0ddcb72e10",
	"restaurantName": "La Armada 2"
}

```


### Insert a new comment

POST
```
/apiGulappX/insertComment

Body:
{
	"restaurantId": "5db4a75662d70c0ddcb72e0f",
	"fullName": "Mauricio Macri",
	"stars": 5,
	"title": "Excelentes",
	"body": "Divinas!!!!"
}
```


### Get all dishes

GET
```
/apiGulappX/getDishes
```

### Get dishes by name (not necessarily the full name)
POST
```
/apiGulappX/getDishesbyName

Body:
{
	"dishName" : "milanesa"
}
```

### Get dishes by name AND Location (not necessarily the full name), returns the dish with the distance from the location pushed
POST
```
/apiGulappX/getDishesbyName

Body:
{
	"dishName" : "milanesa",
	"address" : "Avenida Rivadavia 7800, Buenos Aires, Argentina"
}
```


### Get dishes by ID (not necessarily the full name)
POST
```
/apiGulappX/getDishesbyId

Body:
{
	"dishId" : "5db4a75662d70c0ddcb72e0f"
}
```


### Get dishes by ID AND Location (not necessarily the full name), returns the dish with the distance from the location pushed
POST
```
/apiGulappX/getDishesbyId

Body:
{
	"dishId" : "5db4a75662d70c0ddcb72e0f",
	"address" : "Avenida Rivadavia 7800, Buenos Aires, Argentina"
}
```

### Get dish name (for autocompletion)
GET
```
/apiGulappX/getDishesAutocomplete

Body:
{
	"dishName" : "milanesa"
}
```

### Get all comments

GET
```
/apiGulappX/getComments
```

### Get comments of a specific dish (using mongodb _id native field)
GET
```
/apiGulappX/getCommentsbyId

Body:
{ 
	"idRestaurant" : "5db4a7dd62d70c0ddcb72e10"
}

