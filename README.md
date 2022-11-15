# #Kremen.Electricity Bot

## Development

Set webhook:

```bash
BOT_TOKEN=token && \
BOT_WEBHOOK=webhook && \
curl "https://api.telegram.org/bot$BOT_TOKEN/setWebhook?url=$BOT_WEBHOOK"
```

Send demo message:

```bash
sls invoke local \
  -f webhook \
  -s prd \
  -d '{"httpMethod":"POST","path":"/webhook","body":"{\"update_id\":246644438,\"message\":{\"message_id\":76,\"from\":{\"id\":1801040},\"chat\":{\"id\":1801040},\"date\":1584270799,\"text\":\"/start\"}}"}'
```
