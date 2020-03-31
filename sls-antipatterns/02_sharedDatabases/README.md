# Anti Pattern: Multiple services sharing databases

When 2 services read and write to the same database,
they must do it in the same way.

![01](./assets/01.png)

If both service do not keep their changes in sync, it is possible to
write differently formatted data to the database, which will cause hard
to debug bugs down the road.

![02](./assets/02.png)


In order to avoid this, we can sync every change with the other service, but this means they are tightly coupled. A better solution would either be to combine both services into one:

![03](./assets/03.png)

Or have a dedicated database for each service:

![04](./assets/04.png)

