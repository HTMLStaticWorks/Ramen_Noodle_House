$ErrorActionPreference = "Stop"
$baseDir = "c:\Users\DELL\Desktop\Ramen_Noodle_House"

$stylePath = Join-Path $baseDir "assets\css\style.css"
$styleContent = Get-Content $stylePath -Raw -Encoding UTF8

# 1. Dark mode active state menu color white
$styleContent += "`nhtml[data-theme='dark'] .nav-link.active { color: #ffffff !important; }`n"

Set-Content $stylePath -Value $styleContent -Encoding UTF8

# 3. Fix order page layout
$orderPath = Join-Path $baseDir "order.html"
$orderContent = Get-Content $orderPath -Raw -Encoding UTF8
$orderContent = $orderContent -replace '(?s)                      <div class="d-flex align-items-center gap-3">\s*</div>\s*<span class="fw-bold fs-5">', '                      <div class="d-flex align-items-center gap-3">`n                                <span class="fw-bold fs-5">'
Set-Content $orderPath -Value $orderContent -Encoding UTF8

Write-Host "Done"
