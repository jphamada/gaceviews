$htmlPath = 'c:\Users\Usuario\Documents\distancias-mundial\ruta-aerea-cocaina\index.html'
$lines = [System.IO.File]::ReadAllLines($htmlPath)

$newLines = @()
$inSlide2 = $false

for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    
    if ($line -like "*SLIDE 2: LOS NÚMEROS*") {
        $inSlide2 = $true
        # Skip this comment line
        continue
    }
    
    if ($inSlide2) {
        # Check if we reached the end of slide 2 section
        # The next line after slide 2 should be the start of Slide 3
        if ($line -like "*SLIDE 3: LA AERONAVE*") {
            $inSlide2 = $false
            # Write this comment line of slide 3
            $newLines += $line
        }
        # Skip all lines inside Slide 2
        continue
    }
    
    $newLines += $line
}

[System.IO.File]::WriteAllLines($htmlPath, $newLines, [System.Text.Encoding]::UTF8)
Write-Host "Slide 2 removed successfully using line scanning!"
