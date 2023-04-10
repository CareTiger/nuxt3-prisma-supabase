export default defineEventHandler((event) => {
	console.log("New request: " + event.node.req.url);
	console.log("New request params " + event.context.params);
	console.log("New request query " + event.context.query);
});
