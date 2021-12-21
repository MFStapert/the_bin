conn = Mongo('mongodb://mongo:27017');

db = conn.getDB('myDatabase');
db.dropDatabase();

db = conn.getDB('myDatabase');
db.templates.insert([
	{
		name: 'hello world 1',
		pages: [
			{
				components: [{ componentType: 'HELLO_WORLD' }]
			},
			{
				components: [{ componentType: 'HELLO_WORLD' }]
			}
		]
	}
]);

console.log(db.templates.findOne());
