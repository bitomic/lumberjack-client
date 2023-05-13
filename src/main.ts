import net from 'net'

interface Log {
	component?: string,
	data?: Record<string, unknown>
	level: 'DEBUG' | 'ERROR' | 'INFO' | 'WARN'
	message?: string
	module?: string
	service: string
}

export class Lumberjack {
	public readonly client: net.Socket
	protected ready = false
	public readonly service: string

	public constructor( service: string, host: string, port: number ) {
		this.service = service
		this.client = new net.Socket()
		this.client.connect( port, host, () => {
			this.ready = true
		} )
	}

	protected log( log: Log ): void {
		this.client.write( JSON.stringify( log ) )
	}

	public debug( log: Omit<Log, 'level'> ): void {
		this.log( { ...log, level: 'DEBUG' } )
	}

	public error( log: Omit<Log, 'level'> ): void {
		this.log( { ...log, level: 'ERROR' } )
	}

	public info( log: Omit<Log, 'level'> ): void {
		this.log( { ...log, level: 'INFO' } )
	}

	public warn( log: Omit<Log, 'level'> ): void {
		this.log( { ...log, level: 'WARN' } )
	}
}
