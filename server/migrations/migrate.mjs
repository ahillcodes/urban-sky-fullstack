import { migrate } from "postgres-migrations"
import { fileURLToPath } from 'url';
import path from 'path';

import { config } from '../client';

const currentModuleUrl = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleUrl);
const baseDir = path.dirname(currentModulePath);
const relativePath = path.join(baseDir, 'migrations');

migrate(config, relativePath);