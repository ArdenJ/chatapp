mono -- "$MONGO_INITDB_DATABASE" <<EOF
db.createUser({
  user: "$MONGO_USENAME",
  pwd: "$MONGO_PASSWORD",
  roles: [
    {
      role: 'readWrite', db: "$MONGO_INITDB_DATABASE"
    }
  ]
})
EOF