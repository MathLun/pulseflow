

export interface QueryResult<T = unknown> 
{
	rows: T[];
	rowCount: number;
}

export interface Database {
	connect(): Promise<void>
	disconnect(): Promise<void>
	query<T = unknown>(sql: string, params?: unknown[]): Promise<QueryResult<T>>
}
