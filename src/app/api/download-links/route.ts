import { NextResponse } from "next/server";

type GitHubReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type GitHubRelease = {
  tag_name: string;
  published_at: string;
  html_url: string;
  assets: GitHubReleaseAsset[];
};

const RELEASE_FALLBACK = "https://github.com/hamzafa1d1/typerr-desktop-app/releases/latest";
const API_URL = "https://api.github.com/repos/hamzafa1d1/typerr-desktop-app/releases/latest";

function pickAssetUrl(
  assets: GitHubReleaseAsset[],
  matcher: (asset: GitHubReleaseAsset) => boolean
): string | null {
  const found = assets.find(matcher);
  return found?.browser_download_url ?? null;
}

function extractVersionFromAssets(assets: GitHubReleaseAsset[]): string | null {
  const patterns = [
    /(?:^|[-_])v?(\d+\.\d+\.\d+)(?:[-_]|\.|$)/i,
    /(?:^|[-_])v?(\d+\.\d+)(?:[-_]|\.|$)/i,
  ];

  for (const asset of assets) {
    for (const pattern of patterns) {
      const match = asset.name.match(pattern);
      if (match?.[1]) {
        return match[1];
      }
    }
  }

  return null;
}

export async function GET() {
  const fallbackPayload = {
    links: {
      macOS: RELEASE_FALLBACK,
      Windows: RELEASE_FALLBACK,
      Linux: RELEASE_FALLBACK,
    },
    version: null,
    tagName: null,
    publishedAt: null,
  };

  try {
    const response = await fetch(API_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "typerr-landing-page",
      },
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      return NextResponse.json(fallbackPayload, { status: 200 });
    }

    const release = (await response.json()) as GitHubRelease;

    const macOS =
      pickAssetUrl(
        release.assets,
        (asset) => /\.dmg$/i.test(asset.name) && !/\.blockmap$/i.test(asset.name)
      ) ??
      pickAssetUrl(
        release.assets,
        (asset) => /-mac\.zip$/i.test(asset.name) && !/\.blockmap$/i.test(asset.name)
      ) ??
      RELEASE_FALLBACK;

    const windows =
      pickAssetUrl(release.assets, (asset) => /-setup\.exe$/i.test(asset.name)) ??
      pickAssetUrl(
        release.assets,
        (asset) => /\.exe$/i.test(asset.name) && !/\.blockmap$/i.test(asset.name)
      ) ??
      RELEASE_FALLBACK;

    const linux =
      pickAssetUrl(release.assets, (asset) => /\.appimage$/i.test(asset.name)) ??
      pickAssetUrl(release.assets, (asset) => /\.deb$/i.test(asset.name)) ??
      RELEASE_FALLBACK;

    const version = extractVersionFromAssets(release.assets);

    return NextResponse.json(
      {
        links: {
          macOS,
          Windows: windows,
          Linux: linux,
        },
        version,
        tagName: release.tag_name,
        publishedAt: release.published_at,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(fallbackPayload, { status: 200 });
  }
}
