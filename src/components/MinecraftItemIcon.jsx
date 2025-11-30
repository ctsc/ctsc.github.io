import React from 'react';
import {
    // Clubs/Fun Path
    MinecraftPaper,
    MinecraftMinecart,
    MinecraftBook,
    MinecraftIronIngot,
    MinecraftGoldenApple,
    MinecraftNetherStar,
    MinecraftRedstone,
    MinecraftBundle,
    // School/Projects Path
    MinecraftEnchantedBook,
    MinecraftIronPickaxe,
    MinecraftDiamond,
    MinecraftDiamondSword,
    MinecraftBrewingStand,
    MinecraftGlowstoneDust,
    MinecraftBlazePowder,
    MinecraftBlazeRod,
    MinecraftEndCrystal,
    MinecraftShulkerShell,
    MinecraftCommandBlockMinecart,
    MinecraftFilledMap,
    MinecraftEnderEye,
    MinecraftHopper,
    MinecraftRepeater,
    MinecraftComparator,
    MinecraftFlowerBannerPattern,
    // Internships/Experience Path
    MinecraftLeather,
    MinecraftEnderPearl,
    MinecraftEmerald,
    MinecraftExperienceBottle,
} from 'minecraft-items-react';

/**
 * Minecraft-style item icons for achievements using minecraft-items-react package
 */
const MinecraftItemIcon = ({ itemType, size = 32 }) => {
    // Map achievement itemType to actual Minecraft item components
    const itemComponents = {
        // Clubs/Fun Path
        'diploma': MinecraftPaper,
        'rocket': MinecraftMinecart,
        'star': MinecraftBook,
        'weight': MinecraftIronIngot,
        'trophy': MinecraftGoldenApple,
        'lightbulb': MinecraftRedstone,
        'briefcase': MinecraftBundle,
        
        // School/Projects Path
        'book': MinecraftBook,
        'sword': MinecraftIronPickaxe,
        'enchanted_book': MinecraftEnchantedBook,
        'diamond': MinecraftDiamond,
        'diamond_sword': MinecraftDiamondSword,
        'brewing_stand': MinecraftBrewingStand,
        'redstone_lamp': MinecraftGlowstoneDust,
        'blaze_powder': MinecraftBlazePowder,
        'blaze_rod': MinecraftBlazeRod,
        'end_crystal': MinecraftEndCrystal,
        'shulker_box': MinecraftShulkerShell,
        'command_block': MinecraftCommandBlockMinecart,
        'filled_map': MinecraftFilledMap,
        'ender_chest': MinecraftEnderEye,
        'hopper': MinecraftHopper,
        'repeater': MinecraftRepeater,
        'comparator': MinecraftComparator,
        'poppy': MinecraftFlowerBannerPattern,
        'nether_star': MinecraftNetherStar,
        
        // Internships/Experience Path
        'leather': MinecraftLeather,
        'ender_pearl': MinecraftEnderPearl,
        'emerald_block': MinecraftEmerald,
        'experience_bottle': MinecraftExperienceBottle,
        'beacon': MinecraftNetherStar,
        'chest': MinecraftBundle,
        'ender_eye': MinecraftEnderEye,
    };
    
    // Get the component for this itemType, fallback to Book if not found
    const ItemComponent = itemComponents[itemType] || MinecraftBook;
    
    return (
        <div style={{
            width: size,
            height: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <ItemComponent size={size} />
        </div>
    );
};

export default MinecraftItemIcon;
