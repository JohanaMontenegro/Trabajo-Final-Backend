import { Test, TestingModule } from '@nestjs/testing';
import { EnvioController } from './envio.controller';
import { EnvioService } from './envio.service';

describe('EnvioController', () => {
  let controller: EnvioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnvioController],
      providers: [EnvioService],
    }).compile();

    controller = module.get<EnvioController>(EnvioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
