import { Test, TestingModule } from '@nestjs/testing';
import { TramitadorService } from './tramitador.service';

describe('TramitadorService', () => {
  let service: TramitadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TramitadorService],
    }).compile();

    service = module.get<TramitadorService>(TramitadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
