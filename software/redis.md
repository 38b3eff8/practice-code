# key

set key value
get key
incr key
del key
exists key [key2]
rename key newkey

expire key second
ttl key

randomkey

# list

lindex key index

rpush key value [value]
lpush key value [value]

lrange key start end
llen key

rpop key
lpop key

# set

sadd key value
srem key value // 删除

sismember key value
smenbers key

sunion key1 key2

# sorted set

zadd key score member
zrem key member [member]
zincrby key increment member

zrange key start, end

# hash set

hset key field value [field value]
hgetall key
hget key field

hincrby key field increment
hdel key field
hexists key field

hlen key
hkeys key
