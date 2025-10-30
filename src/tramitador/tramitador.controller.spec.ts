import { Test, TestingModule } from '@nestjs/testing';
import { TramitadorController } from './tramitador.controller';

describe('TramitadorController', () => {
  let controller: TramitadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TramitadorController],
    }).compile();

    controller = module.get<TramitadorController>(TramitadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
