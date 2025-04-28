-- CreateTable
CREATE TABLE `FormulaRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `formulaId` VARCHAR(191) NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `colorValues` JSON NULL,
    `substrateId` INTEGER NULL,
    `equipmentId` INTEGER NULL,
    `lightReflectivity` VARCHAR(191) NOT NULL DEFAULT '[95.17,96.75,97.2,97.18,97.14,97.19,97.39,97.68,97.96,98.1,98.04,97.84,97.58,97.35,97.19,97.07,96.98,96.9,96.85,96.85,96.94,97.11,97.27,97.26,96.91,96.35,95.9,95.89,96.63,98.47,100.86]',
    `tempRate` VARCHAR(191) NULL,
    `holdTime` VARCHAR(191) NULL,
    `pH` VARCHAR(191) NULL,
    `ratio` VARCHAR(191) NULL,
    `stirringRate` VARCHAR(191) NULL,
    `result` VARCHAR(191) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `FormulaRecord_formulaId_key`(`formulaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DyeUsage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `formulaId` INTEGER NOT NULL,
    `dyeId` INTEGER NOT NULL,
    `concentration` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dye` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `fixationRate` VARCHAR(191) NULL,
    `structure` VARCHAR(191) NULL,
    `compatibility` VARCHAR(191) NULL,
    `concentrations` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Dye_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NULL,
    `stirringMethod` VARCHAR(191) NULL,
    `tempPrecision` VARCHAR(191) NULL,
    `capacity` VARCHAR(191) NULL,
    `feeding` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Equipment_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Substrate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `weight` VARCHAR(191) NULL,
    `composition` VARCHAR(191) NULL,
    `pretreatment` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Substrate_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FormulaRecord` ADD CONSTRAINT `FormulaRecord_substrateId_fkey` FOREIGN KEY (`substrateId`) REFERENCES `Substrate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FormulaRecord` ADD CONSTRAINT `FormulaRecord_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `Equipment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DyeUsage` ADD CONSTRAINT `DyeUsage_formulaId_fkey` FOREIGN KEY (`formulaId`) REFERENCES `FormulaRecord`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
