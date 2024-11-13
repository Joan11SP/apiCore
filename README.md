## Description

Recursos para procesos de configuración de la solución:

- Obtener menú
- Obtener configuración de la solución
- etc.

## Installation

```bash
$ Docker build -t api-userlook:1.0.0 .
$ Docker run --restar always --name api_user-look -dp 5001:80 api-userlook:1.0.0
```

## Stay in touch

- Author - Joan Sebastian Peña
- Email - [gmail](joanspena.11@gmail.com)

## License

Nest is [MIT licensed](LICENSE).

## Debug

- crear archivo .vscode al nivel de la carpeta src
- añadir ./vscode/launch.json
- dentro del archivo luanch.json añadir lo siguiente:

{
    
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Nest.js",
            "args": [
                "${workspaceFolder}/src/main.ts"
            ],
            "runtimeArgs": [
                "-r",
                "ts-node/register",
                "-r",
                "tsconfig-paths/register"
            ],
            "autoAttachChildProcesses": true
        }
    ]
}