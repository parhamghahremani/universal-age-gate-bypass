$date = Get-Date -Format 'yyyy-MM-dd_HH-mm-ss'
$zipName = 'universal-age-gate-bypass-full-snapshot-' + $date + '.zip'
$bundleName = 'universal-age-gate-bypass-git-bundle-' + $date + '.bundle'
$zipPath = 'backups\full-snapshots\' + $zipName
$bundlePath = 'backups\git-bundles\' + $bundleName
$manifestPath = 'backups\BACKUP_MANIFEST.md'

# Create ZIP excluding backups, node_modules, dist, versions, .git
Compress-Archive -Path * -DestinationPath $zipPath -Exclude @('backups', 'node_modules', 'dist', 'versions', '.git') -Force

# Create git bundle
git bundle create $bundlePath --all

# Calculate SHA256
$zipHash = (Get-FileHash -Algorithm SHA256 $zipPath).Hash
$bundleHash = (Get-FileHash -Algorithm SHA256 $bundlePath).Hash

$zipSizeKB = [math]::Round((Get-Item $zipPath).Length / 1KB, 2)
$bundleSizeKB = [math]::Round((Get-Item $bundlePath).Length / 1KB, 2)

# Create manifest entry
$manifestEntry = "## $date`n`n### Full Snapshot`n- **File**: $zipName`n- **SHA256**: $zipHash`n- **Size**: $zipSizeKB KB`n`n### Git Bundle`n- **File**: $bundleName`n- **SHA256**: $bundleHash`n- **Size**: $bundleSizeKB KB`n"

# Create/update manifest
if (Test-Path $manifestPath) {
    $existing = Get-Content $manifestPath -Raw
    Set-Content $manifestPath -Value ($manifestEntry + $existing)
} else {
    $header = "# Backup Manifest -- universal-age-gate-bypass`n`n"
    Set-Content $manifestPath -Value ($header + $manifestEntry)
}

Write-Host "ZIP: $zipPath"
Write-Host "Bundle: $bundlePath"
Write-Host "ZIP SHA256: $zipHash"
Write-Host "Bundle SHA256: $bundleHash"