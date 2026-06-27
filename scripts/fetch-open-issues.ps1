param(
    [Parameter(Mandatory = $false)]
    [string]$Owner = "aashikmajhinou",

    [Parameter(Mandatory = $false)]
    [string]$Repo = "msbuild2026",

    [Parameter(Mandatory = $false)]
    [string]$OutputPath = ".\open-issues.json"
)

$headers = @{
    "Accept" = "application/vnd.github+json"
    "User-Agent" = "msbuild2026-issue-fetcher"
}

if ($env:GITHUB_TOKEN) {
    $headers["Authorization"] = "Bearer $env:GITHUB_TOKEN"
}

$page = 1
$perPage = 100
$allIssues = @()

while ($true) {
    $uri = "https://api.github.com/repos/$Owner/$Repo/issues?state=open&per_page=$perPage&page=$page"

    try {
        $response = Invoke-RestMethod -Uri $uri -Headers $headers -Method Get -ErrorAction Stop
    }
    catch {
        throw "Failed to fetch issues from $Owner/$Repo on page $page. $($_.Exception.Message)"
    }

    $pageIssues = @($response)
    if ($pageIssues.Count -eq 0) {
        break
    }

    $normalizedIssues = $pageIssues |
        Where-Object { -not $_.pull_request } |
        ForEach-Object {
            [PSCustomObject]@{
                number = $_.number
                title = $_.title
                state = $_.state
                labels = @($_.labels | ForEach-Object { $_.name })
                html_url = $_.html_url
                created_at = $_.created_at
                updated_at = $_.updated_at
                user = $_.user.login
                assignees = @($_.assignees | ForEach-Object { $_.login })
            }
        }

    $allIssues += $normalizedIssues
    $page += 1
}

$outputDirectory = Split-Path -Path $OutputPath -Parent
if ($outputDirectory -and -not (Test-Path -Path $outputDirectory)) {
    New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
}

$allIssues |
    ConvertTo-Json -Depth 8 |
    Set-Content -Path $OutputPath -Encoding UTF8

Write-Output "Fetched $($allIssues.Count) open issues from $Owner/$Repo to $OutputPath"
