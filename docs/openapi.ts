// src/docs/openapi.ts
import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { CourseSchema } from '../model/course';
import { TimerSchema } from '../model/timer';

const registry = new OpenAPIRegistry();


const CreateCourseSchema = CourseSchema.omit({ id: true }).openapi('CreateCourse');
const CreateTimerSchema = TimerSchema.omit({ id: true }).openapi('CreateTimer');

const ErrorSchema = z.object({
  msg: z.string().openapi({ example: 'Object not found' }),
}).openapi('Error');

const IdParam = z.object({
  id: z.string().openapi({ param: { name: 'id', in: 'path' }, example: '123e4567-e89b-12d3-a456-426614174000' }),
});


registry.registerPath({
  method: 'get',
  path: '/courses',
  description: 'Lista todos los cursos',
  responses: {
    200: {
      description: 'Lista de cursos',
      content: { 'application/json': { schema: z.array(CourseSchema) } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/courses/{id}',
  description: 'Obtiene un curso por id',
  request: { params: IdParam },
  responses: {
    202: {
      description: 'Curso encontrado',
      content: { 'application/json': { schema: CourseSchema } },
    },
    404: {
      description: 'Curso no encontrado',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/courses',
  description: 'Crea un curso. initTime/finalTime van como string ISO tipo "08:00:00"',
  request: {
    body: { content: { 'application/json': { schema: CreateCourseSchema } } },
  },
  responses: {
    201: {
      description: 'Curso creado',
      content: { 'application/json': { schema: CourseSchema } },
    },
    400: {
      description: 'Datos inválidos',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
});

registry.registerPath({
  method: 'put',
  path: '/courses/{id}',
  description: 'Actualiza un curso',
  request: {
    params: IdParam,
    body: { content: { 'application/json': { schema: CreateCourseSchema } } },
  },
  responses: {
    200: {
      description: 'Curso actualizado',
      content: { 'application/json': { schema: CourseSchema } },
    },
    400: {
      description: 'Datos inválidos',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/courses/{id}',
  description: 'Elimina un curso',
  request: { params: IdParam },
  responses: {
    200: { description: 'Curso eliminado' },
    400: {
      description: 'Curso no encontrado',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
});

// ---- Timer routes ----

registry.registerPath({
  method: 'get',
  path: '/timers',
  description: 'Lista todos los timers',
  responses: {
    200: {
      description: 'Lista de timers',
      content: { 'application/json': { schema: z.array(TimerSchema) } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/timers/{id}',
  description: 'Obtiene un timer por id',
  request: { params: IdParam },
  responses: {
    200: {
      description: 'Timer encontrado',
      content: { 'application/json': { schema: TimerSchema } },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/timers',
  description: 'Crea un timer',
  request: {
    body: { content: { 'application/json': { schema: CreateTimerSchema } } },
  },
  responses: {
    201: {
      description: 'Timer creado',
      content: { 'application/json': { schema: TimerSchema } },
    },
    400: {
      description: 'Datos inválidos',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
});

registry.registerPath({
  method: 'put',
  path: '/timers/{id}',
  description: 'Actualiza un timer',
  request: {
    params: IdParam,
    body: { content: { 'application/json': { schema: CreateTimerSchema } } },
  },
  responses: {
    200: {
      description: 'Timer actualizado',
      content: { 'application/json': { schema: TimerSchema } },
    },
    400: {
      description: 'Datos inválidos',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/timers/{id}',
  description: 'Elimina un timer',
  request: { params: IdParam },
  responses: {
    200: { description: 'Timer eliminado' },
    400: {
      description: 'Timer no encontrado',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
});

export function generateOpenApiDocument() {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: '3.0.0',
    info: { title: 'Course & Timer API', version: '1.0.0' },
    servers: [{ url: '/api' }],
  });
}