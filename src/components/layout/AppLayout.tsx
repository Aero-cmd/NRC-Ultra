"use client";

import type React from "react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Icon } from "@iconify/react";
import { VerticalNavbar } from ".././navigation/VerticalNavbar";
import { UserProfileBar } from ".././header/UserProfileBar";
import { NavigationHistory } from "../ui/NavigationHistory";
import { useThemeStore } from "../../store/useThemeStore";
import { BACKGROUND_EFFECTS, useBackgroundEffectStore } from "../../store/background-effect-store";
import { useQualitySettingsStore } from "../../store/quality-settings-store";
import { MatrixRainEffect } from ".././effects/MatrixRainEffect";
import { EnchantmentParticlesEffect } from ".././effects/EnchantmentParticlesEffect";
import { NebulaWaves } from ".././effects/NebulaWaves";
import { NebulaParticles } from ".././effects/NebulaParticles";
import { NebulaGrid } from ".././effects/NebulaGrid";
import { NebulaVoxels } from ".././effects/NebulaVoxels";
import { NebulaLightning } from ".././effects/NebulaLightning";
import { NebulaLiquidChrome } from ".././effects/NebulaLiquidChrome";
import { RetroGridEffect } from "../effects/RetroGridEffect";
import PlainBackground from "../effects/PlainBackground";
import CustomMediaBackground from "../effects/CustomMediaBackground";
import { Snowfall } from "../../features/snow-effect/Snowfall";
import { useSnowEffectStore } from "../../store/snow-effect-store";
import { useLauncherTheme } from "../../hooks/useLauncherTheme";
import * as ConfigService from "../../services/launcher-config-service";
import { SocialsModal } from "../modals/SocialsModal";
import { FriendsSidebar } from "../friends/FriendsSidebar";
import { useFriendsStore } from "../../store/friends-store";
import { useChatStore } from "../../store/chat-store";
import { checkUpdateAvailable, downloadAndInstallUpdate } from "../../services/nrc-service";
import type { UpdateInfo } from "../../types/updater";
import { ProfileWizardV2Modal } from "../modals/ProfileWizardV2Modal";
import { ProfileSettingsModal } from "../modals/ProfileSettingsModal";
import { SettingsModal } from "../modals/SettingsModal";
import { ProfileDuplicateModal } from "../modals/ProfileDuplicateModal";
import { exit, relaunch } from '@tauri-apps/plugin-process';
import { Tooltip } from "../ui/Tooltip";
import { HeaderInfoCarousel } from "../header/HeaderInfoCarousel";
import { toast } from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { parseErrorMessage } from "../../utils/error-utils";

const appConfig = { version: "v0.5.22" };

interface AppLayoutProps { children: ReactNode; activeTab: string; onNavChange: (tabId: string) => void; }

export function AppLayout({ children, activeTab, onNavChange }: AppLayoutProps) {
  const { t } = useTranslation();
  const launcherRef = useRef<HTMLDivElement>(null);
  const backgroundPatternRef = useRef<HTMLDivElement>(null);
  const { currentEffect, customMediaUrl, customMediaOnlyOnPlay, customMediaHideEffects } = useBackgroundEffectStore();
  const isCustomMediaVisible = Boolean(customMediaUrl) && (!customMediaOnlyOnPlay || activeTab === 'play');
  const shouldShowEffects = !(isCustomMediaVisible && customMediaHideEffects);
  const navItems = [
    { id: "play", icon: "solar:play-bold", label: t("nav.play") },
    { id: "profiles", icon: "solar:user-id-bold", label: t("nav.profiles") },
    { id: "mods", icon: "solar:widget-bold", label: t("nav.mods") },
    { id: "nrc-ultra", icon: "solar:bolt-bold", label: "NRC Ultra" },
    { id: "skins", icon: "solar:emoji-funny-circle-bold", label: t("nav.skins") },
    { id: "capes", icon: "solar:shop-bold", label: t("nav.capes") },
    { id: "settings", icon: "solar:settings-bold", label: t("nav.settings"), isAction: true },
  ];
  const { qualityLevel } = useQualitySettingsStore();
  const { isBackgroundAnimationEnabled, accentColor: themeAccentColor } = useThemeStore();
  const { isEnabled: isSnowEnabled } = useSnowEffectStore();
  const { selectedTheme, isThemeActive } = useLauncherTheme();
  const { loadCurrentUser, loadFriends } = useFriendsStore();
  const { loadChats } = useChatStore();
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const initFriends = async () => { try { await loadCurrentUser(); await loadFriends(); await loadChats(); } catch { /* unauthenticated launch is valid */ } };
    initFriends();
  }, []);

  const getComplementaryBackground = () => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(themeAccentColor.value);
    const rgb = result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 34, g: 34, b: 34 };
    return `rgb(${Math.min(Math.floor(rgb.r * 0.1), 30)}, ${Math.min(Math.floor(rgb.g * 0.1), 30)}, ${Math.min(Math.floor(rgb.b * 0.1), 30)})`;
  };
  const backgroundColor = getComplementaryBackground();
  const getQualityParams = () => qualityLevel === "low" ? { particleCount: 30, opacity: 0.2, speed: 0.5 } : qualityLevel === "high" ? { particleCount: 80, opacity: 0.4, speed: 1.5 } : { particleCount: 50, opacity: 0.3, speed: 1 };
  const qualityParams = getQualityParams();

  useEffect(() => {
    const ctx = gsap.context(() => { gsap.from(launcherRef.current, { opacity: 0, scale: 0.95, duration: 0.8, ease: "power3.out" }); });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (activeTab === 'settings') setShowSettings(true);
  }, [activeTab]);

  const handleNavChange = (tabId: string) => {
    if (tabId === 'settings') { setShowSettings(true); return; }
    onNavChange(tabId);
  };

  return (
    <div ref={launcherRef} className="relative flex h-screen w-screen overflow-hidden" style={{ backgroundColor }}>
      {shouldShowEffects && isBackgroundAnimationEnabled && <div ref={backgroundPatternRef} className="pointer-events-none absolute inset-0 opacity-30" />}
      {isCustomMediaVisible && <CustomMediaBackground url={customMediaUrl!} />}
      <VerticalNavbar items={navItems} activeTab={activeTab} onNavChange={handleNavChange} />
      <main className="relative z-10 flex min-w-0 flex-1 flex-col">
        <UserProfileBar />
        <div className="min-h-0 flex-1">{children}</div>
      </main>
      {showSettings && <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />}
      {isSnowEnabled && <Snowfall />}
      <NavigationHistory />
    </div>
  );
}
