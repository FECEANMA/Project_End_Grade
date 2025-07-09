# Número de simulaciones
$NUM_REQUESTS = 100

# Endpoint
$URL = "http://localhost:4000/energy/monitor"

# API Key
$headers = @{
    "x-api-key" = "mi_clave_secreta_1234"
    "Content-Type" = "application/json"
}

For ($i = 1; $i -le $NUM_REQUESTS; $i++) {
    # Generar valores aleatorios
    $voltage = Get-Random -Minimum 200 -Maximum 241
    $current = Get-Random -Minimum 1 -Maximum 20
    $power = $voltage * $current

    # Crear objeto JSON
    $payload = @{
        voltage = $voltage
        current = $current
        power   = $power
    } | ConvertTo-Json -Depth 2

    Write-Host "[$i] Enviando: $payload"

    # Enviar solicitud POST
    try {
        $response = Invoke-RestMethod -Uri $URL -Method Post -Headers $headers -Body $payload
        Write-Host "Respuesta: $response"
    } catch {
        Write-Host "Error al enviar: $_"
    }

    Start-Sleep -Seconds 1
    Write-Host "----------------------------------"
}
