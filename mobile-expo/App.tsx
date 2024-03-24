import { Asset, useAssets } from "expo-asset";
import { readDirectoryAsync, bundleDirectory } from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  // const [assets, error] = useAssets(
  //   require("./assets/webapp/app_manifest.json"),
  // );
  // console.log(assets[0].localUri);
  console.info(`Bundle dir: ${bundleDirectory}`);
  useEffect(() => {
    readDirectoryAsync("file:///android_asset/")
      .then((asset_dir) => {
        console.info(`Asset dir read`);
        if (asset_dir.length === 0) {
          console.warn("Asset dir is empty!");
        }

        for (const file of asset_dir) {
          console.info(`Found: ${file}`);
        }
        return asset_dir;
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const asset = Asset.fromModule(require("assets/webapp/index.html"));
  useEffect(() => {
    console.info(`Asset URI: ${asset.localUri}`);
    console.log(asset);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.info(`Loading: ${isLoading}`);
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <StatusBar translucent />
      <WebView
        source={{ uri: asset.uri }}
        javaScriptEnabled
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        domStorageEnabled
        allowFileAccess
        androidLayerType="hardware"
        originWhitelist={["*"]}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
