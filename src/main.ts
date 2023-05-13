import net from 'net'

export interface Log {
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

	public debug( log: Omit<Log, 'level' | 'service'> ): void {
		this.log( { ...log, level: 'DEBUG', service: this.service } )
	}

	public error( log: Omit<Log, 'level' | 'service'> ): void {
		this.log( { ...log, level: 'ERROR', service: this.service } )
	}

	public info( log: Omit<Log, 'level' | 'service'> ): void {
		this.log( { ...log, level: 'INFO', service: this.service } )
	}

	public warn( log: Omit<Log, 'level' | 'service'> ): void {
		this.log( { ...log, level: 'WARN', service: this.service } )
	}
}
