const fastify = require('fastify')()
 
fastify.register(require('fastify-mysql'), {
  promise: true,
  connectionString: 'mysql://new@localhost/taller'
})
 

fastify.get('/nombre/:numero', async (req, reply) => {
  const connection = await fastify.mysql.getConnection()
  const [rows, fields] = await connection.query(
    'SELECT nombre FROM datos WHERE numero= ?', [req.params.numero],
  )
  connection.release()
  return rows[0]
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})