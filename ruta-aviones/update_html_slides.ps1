$htmlPath = 'c:\Users\Usuario\Documents\distancias-mundial\ruta-aerea-cocaina\index.html'
$html = [System.IO.File]::ReadAllText($htmlPath)

# 1. Replace PANTALLA 1 / 3 with PANTALLA 1 / 2
$html = $html -replace '<span class="slide-number">PANTALLA 1 / 3</span>', '<span class="slide-number">PANTALLA 1 / 2</span>'

# 2. Replace Phase 3 trajectory lines with empty group
$oldPhase3Group = '(?s)<!-- Fase Destino Final \(Exportación al exterior\) -->\s*<g class=\"route-group group-phase-3\">\s*<!-- Paraná hacia Europa / África \(Salida Fluvial del Litoral\) -->\s*<path d=\"M 410 484 Q 480 540 550 580\" class=\"export-path export-east\" marker-end=\"url\(#arrow-cyan\)\" />\s*<!-- Catamarca hacia Chile / Océano Pacífico \(Salida Pacífico\) -->\s*<path d=\"M 172 272 L 80 272\" class=\"export-path export-west\" marker-end=\"url\(#arrow-cyan\)\" />\s*</g>'

$newPhase3Group = @"
<!-- Fase Destino Final (Exportación al exterior) - Solo puntos (sin líneas) -->
                <g class="route-group group-phase-3">
                </g>
"@

if ($html -match $oldPhase3Group) {
    $html = $html -replace $oldPhase3Group, $newPhase3Group
    Write-Host "Phase 3 trajectory lines removed successfully!"
} else {
    Write-Warning "Could not match old Phase 3 group exactly, trying simpler regex..."
    # Simpler regex match
    $simplePattern = '(?s)<!-- Fase Destino Final \(Exportación al exterior\) -->.*?<g class=\"route-group group-phase-3\">.*?</g>'
    if ($html -match $simplePattern) {
        $html = $html -replace $simplePattern, $newPhase3Group
        Write-Host "Phase 3 trajectory lines removed with simple regex successfully!"
    } else {
        Write-Error "Could not find Phase 3 group in HTML!"
    }
}

# 3. Remove Slide 2 completely
$slide2Pattern = '(?s)<!-- ================= SLIDE 2: LOS NÚMEROS ================= -->\s*<section class=\"carousel-slide\" data-slide=\"1\">.*?</section>'
if ($html -match $slide2Pattern) {
    $html = $html -replace $slide2Pattern, ''
    Write-Host "Slide 2 removed successfully!"
} else {
    Write-Error "Could not find Slide 2 in HTML!"
}

# 4. Replace Slide 3 data-slide and header slide-number
$html = $html -replace '<!-- ================= SLIDE 3: LA AERONAVE ================= -->\s*<section class="carousel-slide" data-slide="2">', '<!-- ================= SLIDE 3: LA AERONAVE ================= -->`n        <section class="carousel-slide" data-slide="1">'
$html = $html -replace '<span class="slide-number">PANTALLA 3 / 3</span>', '<span class="slide-number">PANTALLA 2 / 2</span>'

# 5. Remove the 3rd dot from footer navigation dots
$dotsPattern = '(?s)<div class=\"carousel-dots\" id=\"carousel-dots-container\">\s*<button class=\"dot-btn active\" data-slide-target=\"0\"[^>]*></button>\s*<button class=\"dot-btn\" data-slide-target=\"1\"[^>]*></button>\s*<button class=\"dot-btn\" data-slide-target=\"2\"[^>]*></button>\s*</div>'
$newDots = @"
<div class="carousel-dots" id="carousel-dots-container">
        <button class="dot-btn active" data-slide-target="0" aria-label="Ir a pantalla 1"></button>
        <button class="dot-btn" data-slide-target="1" aria-label="Ir a pantalla 2"></button>
      </div>
"@

if ($html -match $dotsPattern) {
    $html = $html -replace $dotsPattern, $newDots
    Write-Host "Carousel dots updated to 2 dots successfully!"
} else {
    Write-Warning "Could not match old dots exactly, trying simple regex..."
    $simpleDotsPattern = '(?s)<div class=\"carousel-dots\" id=\"carousel-dots-container\">.*?</div>'
    if ($html -match $simpleDotsPattern) {
        $html = $html -replace $simpleDotsPattern, $newDots
        Write-Host "Carousel dots updated to 2 dots with simple regex successfully!"
    } else {
        Write-Error "Could not find carousel dots in HTML!"
    }
}

[System.IO.File]::WriteAllText($htmlPath, $html, [System.Text.Encoding]::UTF8)
Write-Host "index.html slides updated successfully!"
