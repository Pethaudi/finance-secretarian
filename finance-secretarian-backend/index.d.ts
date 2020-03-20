/**
 * this an extension of the express-namespace to save
 * the user-data in the request-object
 */
declare namespace Express {
	interface Request {
		userId: number | null;
	}
}