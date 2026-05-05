# delhivery-sdk

TypeScript SDK for the [Delhivery B2C API](https://one.delhivery.com/developer-portal).

## Install

```bash
npm install delhivery-sdk
```

## Quick start

```typescript
import { DelhiveryClient } from "delhivery-sdk";

const client = new DelhiveryClient({ token: process.env.DELHIVERY_TOKEN! });

const [s] = await client.serviceability.check({
  origin_pin: "400001",
  destination_pin: "560001",
  payment_mode: "Prepaid",
  weight: 0.5,
});

const res = await client.orders.create([{
  client_order_id: "ORD-001",
  order: "2024-06-01",
  pickup_location: "My Warehouse",
  payment_mode: "Prepaid",
  total_amount: 999,
  weight: 0.5,
  name: "Rahul Sharma",
  phone: "9876543210",
  add: "123, MG Road",
  city: "Bengaluru",
  state: "Karnataka",
  pin: "560001",
  country: "India",
}]);

const tracking = await client.tracking.trackOne(res.packages[0]!.waybill);
console.log(tracking.ShipmentData[0]?.Shipment.Status);
```

## Resources

| Resource | Description |
|---|---|
| `client.serviceability` | Pincode check, expected TAT |
| `client.orders` | Create, update, cancel, e-waybill |
| `client.tracking` | Real-time tracking |
| `client.shipping` | Cost calculator, waybills, labels, pickup |
| `client.warehouses` | Warehouse management |
| `client.ndr` | NDR actions, reverse pickup QC |
| `client.documents` | Download labels, invoices, PODs |

## Sandbox

```typescript
import { DelhiveryClient, STAGING_BASE_URL } from "delhivery-sdk";

const client = new DelhiveryClient({
  token: process.env.DELHIVERY_STAGING_TOKEN!,
  baseUrl: STAGING_BASE_URL,
});
```

## License

MIT
