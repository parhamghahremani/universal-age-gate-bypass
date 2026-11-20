$date = Get-Date -Format 'yyyy-MM-dd_HH-mm-ss'
$zipName = 'universal-age-gate-bypass-full-snapshot-' + $date + '.zip'
$zipPath = 'backups\full-snapshots\' + $zipName

$root = (Get-Location).Path
$exclude = @('backups', 'node_modules', 'dist', 'versions', '.git')
$allFiles = Get-ChildItem -Recurse -File

$tempDir = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), 'uag-backup-' + [Guid]::NewGuid().ToString('N')[0..7])
New-Item -ItemType Directory -Path $tempDir | Out-Null

foreach ($file in $allFiles) {
    $rel = $file.FullName.Substring($root.Length + 1)
    $firstDir = $rel.Split('\')[0]
    if ($exclude -notcontains $firstDir) {
        $dest = Join-Path $tempDir $rel
        $destDir = Split-Path $dest -Parent
        if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }
        Copy-Item $file.FullName $dest
    }
}

Compress-Archive -Path ($tempDir + '\*') -DestinationPath $zipPath -Force
Remove-Item $tempDir -Recurse -Force

Write-Host 'ZIP created: ' $zipPath