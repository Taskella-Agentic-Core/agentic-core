\# 🧪 Example: Running a Basic Embedded Agent



This example walks you through how to create and run a simple embedded agent using `agentic-core`.



---



\## 1. Define the Agent



Insert into `agent\_definitions`:



```sql

insert into agent\_definitions (

&nbsp; tenant\_id,

&nbsp; name,

&nbsp; description,

&nbsp; prompt,

&nbsp; agent\_type,

&nbsp; agent\_source,

&nbsp; is\_active

) values (

&nbsp; 'your-tenant-id',

&nbsp; '.dm\_nudge\_stale\_leads',

&nbsp; 'Nudges users to follow up on stale leads.',

&nbsp; 'If a lead hasn’t been updated in 5+ days, notify the assigned user.',

&nbsp; 'embedded',

&nbsp; 'embedded',

&nbsp; true

);



