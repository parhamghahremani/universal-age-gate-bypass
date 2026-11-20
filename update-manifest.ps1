$zipPath = 'backups\full-snapshots\universal-age-gate-bypass-full-snapshot-2026-11-18_15-03-58.zip'
$bundlePath = 'backups\git-bundles\universal-age-gate-bypass-git-bundle-2026-11-18_15-02-57.bundle'
$manifestPath = 'backups\BACKUP_MANIFEST.md'

$zipHash = (Get-FileHash -Algorithm SHA256 $zipPath).Hash
$bundleHash = (Get-FileHash -Algorithm SHA256 $bundlePath).Hash
$zipSizeKB = [math]::Round((Get-Item $zipPath).Length / 1KB, 2)
$bundleSizeKB = [math]::Round((Get-Item $bundlePath).Length / 1KB, 2)
$date = '2026-11-18_15-03-58'
$zipName = 'universal-age-gate-bypass-full-snapshot-' + $date + '.zip'
$bundleName = 'universal-age-gate-bypass-git-bundle-' + $date + '.bundle'

$manifestEntry = "## $date`n`n### Full Snapshot`n- **File**: $zipName`n- **SHA256**: $zipHash`n- **Size**: $zipSizeKB KB`n`n### Git Bundle`n- **File**: $bundleName`n- **SHA256**: $bundleHash`n- **Size**: $bundleSizeKB KB`n"

if (Test-Path $manifestPath) {
    $existing = Get-Content $manifestPath -Raw
    Set-Content $manifestPath -Value ($manifestEntry + $existing)
} else {
    $header = "# Backup Manifest -- universal-age-gate-bypass`n`n"
    Set-Content $manifestPath -Value ($header + $manifestEntry)
}

Write-Host 'ZIP SHA256: ' $zipHash
Write-Host 'Bundle SHA256: ' $bundleHash